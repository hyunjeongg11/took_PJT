package com.ssafy.fcmtest;

import com.google.firebase.messaging.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NotificationService {
    private final UserService userService;
//    private final UserCustomRepository userCustomRepository;

    // 정산 메서드
    public void sendNotification(long userSeq, long partySeq, String title, String token, int cost) {

        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody(cost + "원 정산 요청합니다")
                .build();

        Message message = Message.builder()
                .setToken(token)
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

    // 독촉 알림 메서드
    public void sendReminderNotification(long userSeq, long partySeq, String title, int cost) {
        UserEntity user = userService.findByUserSeq(userSeq);
        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody(cost + "원 정산 요청합니다")
                .build();

        Message message = Message.builder()
                .setToken(user.getToken())
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
    public void sendCreateNotification(List<String> tokens, long userSeq, long partySeq, String title) {

        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody("방이 생성되었습니다.")
                .build();

        // 각 토큰에 대해 메시지를 생성하고 멀티캐스트 메시지로 설정
        MulticastMessage message = MulticastMessage.builder()
                .addAllTokens(tokens)
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

    // 토큰 등록
//    @Transactional
//    public void registerToken(TokenRequest request) {
//        userCustomRepository.updateToken(request.getToken(), request.getUserSeq());
//    }

//    @Override
//    public void updateToken(String token, Long userSeq) {
//        QUserEntity user = QUserEntity.userEntity;
//
//        queryFactory.update(user)
//                .where(user.userSeq.eq(userSeq))
//                .set(user.token, token)
//                .execute();
//    }

}
