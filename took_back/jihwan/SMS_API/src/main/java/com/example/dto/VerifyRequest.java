package com.example.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class VerifyRequest {

    @NotNull
    private String phoneNumber;

    @NotNull
    private int code;
}
