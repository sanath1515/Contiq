package com.contiq.userservice.service;

import com.contiq.userservice.dto.LoginDto;
import com.contiq.userservice.dto.UserDto;
import com.contiq.userservice.entity.User;
import com.contiq.userservice.exception.NotFoundException;
import com.contiq.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public List<UserDto> getAllUsers() {
        try{
            List<User> userList = userRepository.findAll();
            return userList.stream()
                    .map(user -> modelMapper.map(user, UserDto.class))
                    .collect(Collectors.toList());
        }
        catch (Exception e){
            throw new NotFoundException("An error occurred while fetching all users",e);
        }
    }

    @Override
    public UserDto getUserByEmail(String email) {
        Optional<User> user= userRepository.findByEmail(email);
        UserDto theUserDto;
        if(user.isPresent()){
            theUserDto = modelMapper.map(user.get(), UserDto.class);
        }else{
            throw new NotFoundException(("User not found with email "+email));
        }
        return theUserDto;
    }

    @Override
    public UserDto getUserById(int id) {
        Optional<User> result = userRepository.findById(id);
        UserDto theUserDto;
        if (result.isPresent()) {
            theUserDto = modelMapper.map(result.get(), UserDto.class);
        } else {
            throw new NotFoundException("User not found with id-" + id);
        }
        return theUserDto;
    }
    @Override
    public UserDto createUser(UserDto userDto) {
        Optional<User> userOptional = userRepository.findByEmail(userDto.getEmail());
        if (userOptional.isPresent()) {
            log.error("User creation failed. User already exists with email: ", userDto.getEmail());
            throw new IllegalArgumentException("User already Exists");
        } else {
            User theUser = modelMapper.map(userDto, User.class);
            String encryptedPassword = bCryptPasswordEncoder.encode(theUser.getPassword());
            theUser.setPassword(encryptedPassword);
            User user = userRepository.save(theUser);
            return modelMapper.map(user, UserDto.class);
        }
    }

    @Override
    public void resetPassword(LoginDto loginDto) {
        Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String encodedPassword = bCryptPasswordEncoder.encode(loginDto.getPassword());
            user.setPassword(encodedPassword);
            userRepository.save(user);
            log.info("Password reset successfully for email: ", loginDto.getEmail());
        } else {
            log.error("Password reset failed. User not found with email: ", loginDto.getEmail());
            throw new NotFoundException("User not found with email: " + loginDto.getEmail());
        }
    }
}
