package com.example.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class SmsRequest {
    @NotNull
    private String phoneNumber;
}
