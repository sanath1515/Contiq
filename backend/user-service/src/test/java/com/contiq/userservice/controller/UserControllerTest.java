package com.contiq.userservice.controller;

import com.contiq.userservice.dto.Auth;
import com.contiq.userservice.dto.LoginDto;
import com.contiq.userservice.dto.UserDto;
import com.contiq.userservice.service.JwtService;
import com.contiq.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;
class UserControllerTest {
    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;
    @Mock
    private JwtService jwtService;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetUserById(){
        int userId = 1;
        UserDto userDto = new UserDto();
        userDto.setId(userId);
        when(userService.getUserById(userId)).thenReturn(userDto);
        ResponseEntity<UserDto> responseEntity = userController.getUserById(userId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(userDto, responseEntity.getBody());
    }
    @Test
    void testGetAllUsers() {
        UserDto userDto = new UserDto();
        when(userService.getAllUsers()).thenReturn(Collections.singletonList(userDto));
        ResponseEntity<List<UserDto>> responseEntity = userController.getAllUsers();
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        List<UserDto> users = responseEntity.getBody();
        assertNotNull(users);
        assertEquals(1, users.size());
    }
    @Test
    void testGetUserByEmail(){
        String email = "saicharan@gmail.com";
        UserDto userDto = new UserDto();
        userDto.setEmail(email);
        when(userService.getUserByEmail(email)).thenReturn(userDto);
        ResponseEntity<UserDto> responseEntity = userController.getUserByEmail(email);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(userDto, responseEntity.getBody());
    }
    @Test
    void testCreateUser(){
        String email = "saicharan@gmail.com";
        UserDto userDTO = new UserDto(1,email,"saicharan","Saicharan@123");
        when(userService.createUser(userDTO)).thenReturn(userDTO);
        ResponseEntity<UserDto> responseEntity = userController.createUser(userDTO);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
    @Test
    void testResetUserPassword() {
        LoginDto loginDto = new LoginDto();
        ResponseEntity<String> responseEntity = userController.resetUserPassword(loginDto);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Password Reset Successfully", responseEntity.getBody());
    }
    @Test
    void testGetTokenWithAuthNull()
    {
        Auth authRequest = new Auth();
        when(jwtService.generateToken(authRequest.getEmail(),authRequest.getPassword())).thenReturn("Either of email or password is null");
        assertEquals("Either of email or password is null",userController.getToken(authRequest).getBody());
    }
    @Test
    void testGetTokenWithAuth()
    {
        String expectedToken = "validToken";
        Auth authRequest = new Auth("test@gmail.com","test@123");
        when(jwtService.generateToken(authRequest.getEmail(),authRequest.getPassword())).thenReturn(expectedToken);
        assertEquals(expectedToken,userController.getToken(authRequest).getBody());
    }
    @Test
    void testGetTokenWithAuthPasswordNull()
    {
        Auth authRequest = new Auth("test@gmail.com",null);
        when(jwtService.generateToken(authRequest.getEmail(),authRequest.getPassword())).thenReturn("Either of email or password is null");
        assertEquals("Either of email or password is null",userController.getToken(authRequest).getBody());
    }
    @Test
    void testUserExistsPasswordNotMatches(){
        Auth authRequest = new Auth("test@gmail.com","Test@123");
        when(jwtService.generateToken(authRequest.getEmail(),authRequest.getPassword())).thenReturn("Unable to generate token");
        ResponseEntity<String> response= userController.getToken(authRequest);
        assertEquals("Unable to generate token",response.getBody());
    }
    @Test
    void testValidateToken() {
        String email = "test@gmail.com";
        String generatedToken = "validtoken";
        jwtService.validateToken(generatedToken);
        assertEquals("Token is valid",userController.validateToken(generatedToken));
    }
}
