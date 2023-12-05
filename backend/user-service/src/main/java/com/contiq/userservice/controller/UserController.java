package com.contiq.userservice.controller;

import com.contiq.userservice.dto.Auth;
import com.contiq.userservice.dto.LoginDto;
import com.contiq.userservice.dto.UserDto;
import com.contiq.userservice.service.JwtService;
import com.contiq.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
            List<UserDto> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Integer id) {
            UserDto userDTO = userService.getUserById(id);
            return ResponseEntity.ok(userDTO);
    }
    @GetMapping("/email")
    public ResponseEntity<UserDto> getUserByEmail(@RequestParam("email") String email) {
            UserDto user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
    }
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
            UserDto newUser = userService.createUser(userDto);
            return ResponseEntity.ok(newUser);
    }
    @PatchMapping
    public ResponseEntity<String> resetUserPassword(@RequestBody LoginDto loginDto) {
        userService.resetPassword(loginDto);
        return new ResponseEntity<>("Password Reset Successfully", HttpStatus.OK);
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        jwtService.validateToken(token);
        return "Token is valid";
    }

    @PostMapping("/login")
    public ResponseEntity<String> getToken(@RequestBody Auth auth) {
        if(auth.getEmail()!=null && auth.getPassword()!=null) {
            String result =  jwtService.generateToken(auth.getEmail(),auth.getPassword());
            if(!result.equals("Unable to generate token")){
                return new ResponseEntity<>(result,HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>("Unable to generate token",HttpStatus.NOT_FOUND);
            }
        }
        else
            return new ResponseEntity<>("Either of email or password is null",HttpStatus.NOT_FOUND);
    }
}
