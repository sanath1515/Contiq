package com.contiq.userservice.service;

import com.contiq.userservice.dto.LoginDto;
import com.contiq.userservice.dto.UserDto;
import com.contiq.userservice.entity.User;
import com.contiq.userservice.exception.NotFoundException;
import com.contiq.userservice.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class UserServiceImplTest {
    @InjectMocks private UserServiceImpl userService;
    @Mock private UserRepository userRepository;
    @Mock private ModelMapper modelMapper;
    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetUserById(){
        int userId = 1;
        User user = new User(userId,"saicharan@gmail.com","saicharanm","Saicharan@123",0);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        UserDto userDTO = new UserDto(userId,"saicharan@gmail.com","saicharanm","Saicharan@123");
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDTO);
        UserDto result = userService.getUserById(userId);
        assertNotNull(result);
        assertEquals(userDTO.getId(), result.getId());
        assertEquals(userDTO.getName(), result.getName());
        assertEquals(userDTO.getEmail(), result.getEmail());
    }
    @Test
    void testUserGetById_NotExists() {
        int userId = 1;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        NotFoundException exception = Assertions.assertThrows(NotFoundException.class,
                () -> userService.getUserById(userId));
        assertEquals("User not found with id-" +userId,exception.getMessage());
    }
    @Test
    void testGetAllUsers() {
        List<User> mockUsers = new ArrayList<>();
        mockUsers.add(new User());
        mockUsers.add(new User());
        when(userRepository.findAll()).thenReturn(mockUsers);
        when(modelMapper.map(any(User.class), eq(UserDto.class)))
                .thenReturn(new UserDto());
        List<UserDto> results = userService.getAllUsers();
        assertNotNull(results);
        assertEquals(2, results.size());
        verify(userRepository, times(1)).findAll();
    }
    @Test
    void testGetAllUser_NotFound(){
        when(userRepository.findAll()).thenReturn(null);
        NotFoundException exception = Assertions.assertThrows(NotFoundException.class,
                () -> userService.getAllUsers());
        assertEquals("An error occurred while fetching all users" ,exception.getMessage());
    }
    @Test
    void testGetUserByEmail(){
        String email = "saicharan@gmail.com";
        User user = new User(1,email,"saicharan","Saicharan@123",0);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        UserDto userDTO = new UserDto(1,email,"saicharan","Saicharan@123");
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDTO);
        UserDto result = userService.getUserByEmail(email);
        assertNotNull(result);
        assertEquals(userDTO.getId(), result.getId());
        assertEquals(userDTO.getName(), result.getName());
        assertEquals(userDTO.getEmail(), result.getEmail());
    }
    @Test
    void testUserGetByEmail_NotExists() {
        String email = "saicharan@gmail.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        NotFoundException exception = Assertions.assertThrows(NotFoundException.class,
                () -> userService.getUserByEmail(email));
        assertEquals("User not found with email " +email,exception.getMessage());
    }
    @Test
    void testCreateNewUser_alreadyExists(){
        String email = "saicharan@gmail.com";
        User user = new User(1,email,"saicharan","Saicharan@123",0);
        UserDto userDTO = new UserDto(1,email,"saicharan","Saicharan@123");
        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(Optional.of(user));
        IllegalArgumentException exception = Assertions.assertThrows(IllegalArgumentException.class,
                () -> userService.createUser(userDTO));
        assertEquals("User already Exists",exception.getMessage());
    }
    @Test
    void testCreateNewUser_Success(){
        String email = "saicharan@gmail.com";
        String encodedPassword = bCryptPasswordEncoder.encode("Saicharan@123");
        User user = new User(1,email,"saicharan",encodedPassword,0);
        UserDto userDTO = new UserDto(1,email,"saicharan","Saicharan@123");
        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(Optional.empty());
        when(modelMapper.map(userDTO, User.class)).thenReturn(user);
        when(userRepository.save(any())).thenReturn(user);
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDTO);
        UserDto userDto = userService.createUser(userDTO);
        assertEquals(userDto.getEmail(),email);
    }
    @Test
    void testResetPassword_UserNotFound() {
        String userEmail = "nonexist@example.com";
        String newPassword = "newPassword";
        LoginDto loginDto = new LoginDto(userEmail, newPassword);
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> userService.resetPassword(loginDto));
    }
    @Test
    void testResetPassword_Success() {
        String userEmail = "john@example.com";
        String newPassword = "newPassword";
        LoginDto loginDto = new LoginDto(userEmail, newPassword);
        User existingUser = new User();
        existingUser.setEmail(userEmail);
        existingUser.setPassword("oldEncodedPassword");
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(existingUser));
        when(bCryptPasswordEncoder.encode(newPassword)).thenReturn("newEncodedPassword");
        userService.resetPassword(loginDto);
        assertEquals("newEncodedPassword", existingUser.getPassword());
        verify(userRepository, times(1)).save(existingUser);
    }
}
