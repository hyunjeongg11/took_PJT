package com.housing.back.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/v1/user")
public class TestContoller {

    @GetMapping("/aa")
    public String aa() {
        return "aa";
    }
    
    
}
