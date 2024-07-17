package com.example.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@NoArgsConstructor
@Getter
public class VerifyRequest {

    @NotNull
    private String phoneNumber;

    @NotNull
    private int code;
}
