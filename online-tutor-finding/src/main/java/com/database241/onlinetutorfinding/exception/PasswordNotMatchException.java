package com.database241.onlinetutorfinding.exception;

public class PasswordNotMatchException extends RuntimeException
{
    public PasswordNotMatchException(String message)
    {
        super(message);
    }
}
