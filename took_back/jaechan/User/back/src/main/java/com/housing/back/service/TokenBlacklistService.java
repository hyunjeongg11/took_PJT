package com.housing.back.service;

import java.util.concurrent.TimeUnit;

public interface TokenBlacklistService {
    void addToken(String Token,long duration, TimeUnit unit);
    boolean isTokenBlacklisted(String token);
    long getExpiryFromToken(String Token);
}
