package com.edunewplat.backend.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeedRunner implements CommandLineRunner {
    private final DataRecordService service;

    public DataSeedRunner(DataRecordService service) {
        this.service = service;
    }

    @Override
    public void run(String... args) {
        service.seedIfNeeded();
    }
}
