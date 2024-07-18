package com.ssafy.ssetest.service;

import com.ssafy.ssetest.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Service
public class NotificationService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    
    // 알림 등록 메서드
    private SseEmitter createEmitter(String id) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        notificationRepository.save(id, emitter);

        emitter.onCompletion(() -> notificationRepository.deleteById(id));
        emitter.onTimeout(() -> notificationRepository.deleteById(id));

        return emitter;
    }
    
    // 알림 전송 메서드
    private void sendEvent(String sendId, Object data) {
        SseEmitter emitter = notificationRepository.get(sendId);
        
        // 알림 설정이 된 Id이면 보냄
        if (emitter != null) {
            try {
                
                // sendId에서 알림 이벤트 발생
                emitter.send(SseEmitter.event().id(sendId).name("알림").data(data));
            } catch (IOException exception) {
                notificationRepository.deleteById(sendId);
                emitter.completeWithError(exception);
            }
        }
    }
    
    // 알림 설정
    public SseEmitter subscribe(String userId) {
        SseEmitter emitter = createEmitter(userId);
        return emitter;
    }

    // 알림 보내기
    public void sendNotification(String userId, String message) {
        sendEvent(userId, message);
    }

}
