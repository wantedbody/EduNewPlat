package com.edunewplat.backend.service;

import com.edunewplat.backend.entity.DataRecord;
import com.edunewplat.backend.repository.DataRecordRepository;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DataRecordService {
    private final DataRecordRepository repository;
    private final boolean seedEnabled;

    public DataRecordService(DataRecordRepository repository,
                             @Value("${app.seed.enabled:true}") boolean seedEnabled) {
        this.repository = repository;
        this.seedEnabled = seedEnabled;
    }

    @Transactional
    public void seedIfNeeded() {
        if (!seedEnabled || repository.count() > 0) {
            return;
        }
        List<DataRecord> records = Arrays.asList(
            new DataRecord("湖北基础教育资源", "资源库", 1200, 980, LocalDateTime.now().minusDays(1)),
            new DataRecord("区域教研活动", "教研", 320, 255, LocalDateTime.now().minusHours(5)),
            new DataRecord("教师发展项目", "师训", 150, 108, LocalDateTime.now().minusHours(2)),
            new DataRecord("学生综合素质", "评价", 520, 480, LocalDateTime.now().minusHours(3))
        );
        repository.saveAll(records);
    }

    public List<DataRecord> fetchAll() {
        return repository.findAll();
    }

    public DataRecord create(DataRecord record) {
        record.setUpdatedAt(LocalDateTime.now());
        return repository.save(record);
    }
}
