package com.database241.onlinetutorfinding;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.database241.onlinetutorfinding.config.HashAllPassConfig;

@SpringBootApplication
public class OnlineTutorFindingApplication
{
	public static void main(String[] args) {
		SpringApplication.run(OnlineTutorFindingApplication.class, args);
	}

	@Bean
    CommandLineRunner run(HashAllPassConfig hashAllPassConfig) {
        return args -> {
            hashAllPassConfig.run();
        };
    }
}
