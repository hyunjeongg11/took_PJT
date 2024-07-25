package com.took.sms_api.controller;


import com.took.sms_api.dto.SmsRequest;
import com.took.sms_api.dto.VerifyRequest;
import com.took.sms_api.service.SmsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sms")
@RequiredArgsConstructor
@Tag(name = "SMS 인증 API", description = "SMS 인증을 위한 API입니다.")
public class SmsController {

    private final SmsService smsService;

    @Operation(summary = "SMS 전송", description = "사용자의 전화번호로 인증 코드를 전송합니다.")
    @PostMapping("/send")
    public ResponseEntity<?> sendSms(@RequestBody SmsRequest smsRequest) {
        smsService.createOrUpdateIdentity(smsRequest.getPhoneNumber());
        return ResponseEntity.ok(1);
    }

    @Operation(summary = "휴대폰 인증", description = "휴대폰 인증을 진행합니다.")
    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody VerifyRequest verifyRequest) {
        boolean result = smsService.verifyCode(verifyRequest.getPhoneNumber(), verifyRequest.getCode());
        return ResponseEntity.ok(result);
    }
}
