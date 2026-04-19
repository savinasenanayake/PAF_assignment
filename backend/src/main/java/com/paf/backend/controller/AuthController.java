package com.paf.backend.controller;

import com.paf.backend.model.User;
import com.paf.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setRole("USER"); // force default role
        return userRepository.save(user);
    }

    @PostMapping("/login")
public Object login(@RequestBody User user) {

    User existingUser = userRepository.findByUsername(user.getUsername());

    if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
        return existingUser; // return full user (including role)
    }

    return "Invalid username or password";
}

@PutMapping("/make-admin/{id}")
public User makeAdmin(@PathVariable String id) {
    User user = userRepository.findById(id).orElseThrow();
    user.setRole("ADMIN");
    return userRepository.save(user);
}
}