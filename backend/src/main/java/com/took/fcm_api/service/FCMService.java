package com.took.fcm_api.service;

import com.google.firebase.messaging.*;
import com.took.fcm_api.dto.FCMRequest;
import com.took.fcm_api.dto.FCMTokenRequest;
import com.took.fcm_api.dto.MessageRequest;
import com.took.fcm_api.entity.FCMToken;
import com.took.fcm_api.repository.FCMRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FCMService {
    private final FCMRepository fcmRepository;

    public void saveToken(FCMTokenRequest request) {
        FCMToken fcmToken = FCMToken.builder()
                .userSeq(String.valueOf(request.getUserSeq()))  // request에서 userId 가져옴
                .token(request.getToken())
                .build();
        fcmRepository.save(fcmToken);
    }

    public String getToken(long userSeq) {
        FCMToken fcmToken = fcmRepository.findByUserSeq(String.valueOf(userSeq)).orElse(null);
        if (fcmToken == null) {
            return null;
        }
        return fcmToken.getToken();
    }
    public List<String> getTokens(List<Long> userSeqList) {
        List<String> tokens = new ArrayList<>();
        for (Long userSeq : userSeqList) {
            FCMToken fcmToken = fcmRepository.findByUserSeq(String.valueOf(userSeq)).orElse(null);
            if (fcmToken != null) {
                tokens.add(fcmToken.getToken());
            }
        }
        return tokens;
    }
    // 정산 메서드
    public void sendNotification(FCMRequest request) {
        Notification notification = Notification.builder()
                .setTitle(request.getTitle())
                .setBody(request.getCost() + "원 정산 요청합니다")
                .build();

        Message message = Message.builder()
                .setToken(getToken(request.getReceiveUserSeq()))
                .setNotification(notification)
                .putData("click_action", "ClickAction")
                .putData("userSeq", String.valueOf(request.getUserSeq()))
                .putData("partySeq", String.valueOf(request.getPartySeq()))
                .putData("cost", String.valueOf(request.getCost()))
                .putData("category", String.valueOf(request.getCategory()))
                .build();

        try {
            FirebaseMessaging.getInstance().send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendMessage(MessageRequest request) {
        Notification notification = Notification.builder()
                .setTitle(request.getTitle())
                .setBody(request.getBody())
                .build();

        // 각 토큰에 대해 메시지를 생성하고 멀티캐스트 메시지로 설정
        MulticastMessage message = MulticastMessage.builder()
                .addAllTokens(getTokens(request.getUserSeqList()))
                .setNotification(notification)
                .putAllData(request.getData())
                .build();

        try {
            FirebaseMessaging.getInstance().sendMulticast(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
