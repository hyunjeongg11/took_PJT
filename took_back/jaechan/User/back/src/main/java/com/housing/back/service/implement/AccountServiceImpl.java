package com.housing.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.housing.back.dto.request.account.AccountLinkRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.account.AccountLinkResponseDto;
import com.housing.back.entity.AccountEntity;
import com.housing.back.entity.BankEntity;
import com.housing.back.entity.UserEntity;
import com.housing.back.repository.AccountRepository;
import com.housing.back.repository.BankRepositoryCustom;
import com.housing.back.repository.UserRepository;
import com.housing.back.service.AccountService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final UserRepository userRepository;
    private final BankRepositoryCustom bankRepositoryCustom;
    private final AccountRepository accountRepository;

    @Override
    public ResponseEntity<? super AccountLinkResponseDto> saveAccount(AccountLinkRequestDto dto) {

        try{

            // 계좌 인증용
            String accountNum = dto.getAccountNum();
            String accountPwd = dto.getAccountPwd();

            // 계좌 인증 완료
            BankEntity bank = bankRepositoryCustom.isMatched(accountNum,accountPwd);

            if(bank!=null){

                // 정보 저장
                String accountName = dto.getAccountName();
                UserEntity user = userRepository.findById(dto.getUserSeq()) .orElseThrow(() -> new IllegalArgumentException("User not found"));
                
                System.out.println("계좌의 가명을 출력합니다.: " +accountName);
                
                AccountEntity account = new AccountEntity(accountName,user,bank);

                if(accountName==null){
                    accountName = bank.getBankName()+" 계좌";
                }

                accountRepository.save(account);


            }else{
                return AccountLinkResponseDto.notFound();
            }
            

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return AccountLinkResponseDto.success();
    }
    
}
