package com.contiq.userservice.service;

import com.contiq.userservice.dto.LoginDto;
import com.contiq.userservice.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();
    UserDto getUserByEmail(String email);
    UserDto getUserById(int id);
    UserDto createUser(UserDto newUser);
    void resetPassword(LoginDto loginDto);
}
