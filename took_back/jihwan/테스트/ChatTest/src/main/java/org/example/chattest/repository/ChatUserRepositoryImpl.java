//package org.example.chattest.repository;
//
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import lombok.RequiredArgsConstructor;
//import org.example.chattest.entity.QChatUser;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//@RequiredArgsConstructor  // Lombok 어노테이션으로, final 필드에 대한 생성자를 자동으로 생성합니다.
//@Repository  // 이 클래스가 Spring의 리포지토리 역할을 한다는 것을 나타냅니다.
//public class ChatUserRepositoryImpl implements ChatUserRepositoryCustom {
//
//    private final JPAQueryFactory queryFactory;  // QueryDSL을 사용하기 위한 JPAQueryFactory 주입
//
//    @Override
//    @Transactional  // 메서드가 트랜잭션 내에서 실행되도록 설정합니다.
//    public void deleteByChatRoomRoomSeq(Long roomSeq) {
//        QChatUser chatUser = QChatUser.chatUser;  // QChatUser 인스턴스를 생성합니다.
//        queryFactory.delete(chatUser)  // QueryDSL delete 쿼리를 시작합니다.
//                .where(chatUser.chatRoom.roomSeq.eq(roomSeq))  // 채팅방 번호가 일치하는 조건을 설정합니다.
//                .execute();  // 쿼리를 실행합니다.
//    }
//}
