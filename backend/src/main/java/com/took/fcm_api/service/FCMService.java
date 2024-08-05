package com.took.fcm_api.service;

import com.google.firebase.messaging.*;
import com.took.fcm_api.dto.FCMRequest;
import com.took.user_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FCMService {
    private static final String TOKEN_KEY_PREFIX = "fcmToken:";

    private RedisTemplate<String, Object> redisTemplate;

    public void saveToken(long userSeq, String token) {
        String key = TOKEN_KEY_PREFIX + userSeq;
        redisTemplate.opsForValue().set(key, token);
    }

    public String getToken(long userSeq) {
        String key = TOKEN_KEY_PREFIX + userSeq;
        return (String) redisTemplate.opsForValue().get(key);
    }

    public List<String> getTokens(List<String> userSeqList) {
        List<String> keys = userSeqList.stream()
                .map(userSeq -> TOKEN_KEY_PREFIX + userSeq)
                .collect(Collectors.toList());

        List<Object> values = redisTemplate.opsForValue().multiGet(keys);

        // List<Object>를 List<String>으로 변환
        return values.stream()
                .map(Object::toString)
                .collect(Collectors.toList());
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

    // 독촉 알림 메서드
    public void sendReminderNotification(long userSeq, long partySeq, String title, int cost) {
        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody(cost + "얼른 보내주세요")
                .build();

        Message message = Message.builder()
                .setToken(getToken(userSeq))
                .setNotification(notification)
                .putData("click_action", "ClickAction")
                .putData("userSeq", String.valueOf(userSeq))
                .putData("partySeq", String.valueOf(partySeq))
                .putData("cost", String.valueOf(cost))
                .build();

        try {
            FirebaseMessaging.getInstance().send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 방 생성 알림 메서드
    public void sendCreateNotification(List<String> userSeqList, long userSeq, long partySeq, String title) {

        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody("방이 생성되었습니다.")
                .build();

        // 각 토큰에 대해 메시지를 생성하고 멀티캐스트 메시지로 설정
        MulticastMessage message = MulticastMessage.builder()
                .addAllTokens(getTokens(userSeqList))
                .putData("click_action", "ClickAction")
                .putData("userSeq", String.valueOf(userSeq))
                .putData("partySeq", String.valueOf(partySeq))
                .setNotification(notification)
                .build();

        try {
            BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);
            System.out.println(response.getSuccessCount() + " messages were sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
