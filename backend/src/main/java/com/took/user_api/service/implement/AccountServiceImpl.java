package com.took.user_api.service.implement;


import com.took.user_api.dto.request.account.*;
import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.account.*;
import com.took.user_api.entity.AccountEntity;
import com.took.user_api.entity.BankEntity;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.AccountRepository;
import com.took.user_api.repository.BankRepository;
import com.took.user_api.repository.UserRepository;
import com.took.user_api.repository.custom.AccountRepositoryCustom;
import com.took.user_api.repository.custom.BankRepositoryCustom;
import com.took.user_api.service.AccountService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final BankRepository bankRepository;
    private final UserRepository userRepository;
    private final BankRepositoryCustom bankRepositoryCustom;
    private final AccountRepository accountRepository;
    private final AccountRepositoryCustom accountRepositoryCustom;

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
                UserEntity user = userRepository.getReferenceById(dto.getUserSeq());
                Boolean main = dto.getMain();

                AccountEntity account = new AccountEntity(accountName,main,user,bank);

                if(accountName==null){
                    accountName = bank.getBankName()+" 계좌";
                }

                if(dto.getMain()==true) accountRepositoryCustom.isMain(dto.getUserSeq());

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


    @Override
    @Transactional
    public ResponseEntity<? super ChangeMainResponseDto> changeMain(ChangeMainRequestDto dto) {
        
        try{
            accountRepositoryCustom.changeMain(dto.getUserSeq(),dto.getAccountSeq());
        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ChangeMainResponseDto.success();
    }


    @Override
    public ResponseEntity<? super AccountListResponsetDto> accountList(AccountListRequestDto dto) {

        List<AccountEntity> list = null;
        
        try{
            list = accountRepositoryCustom.findAccountsByUserSeq(dto.getUserSeq());


        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return AccountListResponsetDto.success(list);
    }


    @Override
    public ResponseEntity<? super AccountBalanceResponseDto> balance(AccountSeqRequestDto dto) {
     
        Long bankSeq = null;
        Long balance = null;

        try{

            bankSeq = accountRepositoryCustom.findBankSeqByAccountSeq(dto.getAccountSeq());
            balance = bankRepositoryCustom.findBalanceByBankSeq(bankSeq);

        }catch(Exception e){
            e.printStackTrace();
            ResponseDto.databaseError();
        }

        return AccountBalanceResponseDto.success(balance);

    }


    @Transactional
    @Override
    public ResponseEntity<String> deleteAccount(Long accountSeq) {
        
        try{

            accountRepository.deleteById(accountSeq);

        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.ok("DBE!");
        }

        return ResponseEntity.ok("Done!");
    }


    @Transactional
    @Override
    public ResponseEntity<? super AccountEasyPwdResponseDto> updateEasyPwd(AccountEasyPwdRequestDto requestBody) {
        


        try{

            accountRepositoryCustom.updateEasyPwd(requestBody.getAccountSeq(),requestBody.getEasyPwd());

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return AccountEasyPwdResponseDto.success();

    }


    @Override
    public ResponseEntity<? super CheckEasyPwdResponseDto> checkEasyPwd(AccountEasyPwdRequestDto requestBody) {
        

        boolean result = false;

        try{

            String easyPwd = accountRepositoryCustom.checkEasyPwd(requestBody.getAccountSeq());

            if(easyPwd.equals(requestBody.getEasyPwd())) result = true;

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return CheckEasyPwdResponseDto.success(result);
    }

    @Override
    public ResponseEntity<? super VoidResponseDto> repay(RepayRequestDto requestBody) {

        Long bankSeq = null;
        BankEntity bank = null;

        try{

            bankSeq = accountRepositoryCustom.findBankSeqByAccountSeq(requestBody.getAccountSeq());
            bank = bankRepository.getReferenceById(bankSeq);

            if(!bank.minus(requestBody.getCost())) return ResponseDto.nomoney();

//           뱅크 업데이트 필요
            Long bankCost = bank.getBalance();

            bankRepositoryCustom.update(bankSeq,bankCost);

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return VoidResponseDto.success();
    }
}
