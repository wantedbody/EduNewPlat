package com.edunewplat.backend.controller;

import com.edunewplat.backend.dto.DataRecordRequest;
import com.edunewplat.backend.entity.DataRecord;
import com.edunewplat.backend.service.DataRecordService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/data-records")
@CrossOrigin
public class DataRecordController {
    private final DataRecordService service;

    public DataRecordController(DataRecordService service) {
        this.service = service;
    }

    @GetMapping
    public List<DataRecord> list() {
        return service.fetchAll();
    }

    @PostMapping
    public DataRecord create(@Valid @RequestBody DataRecordRequest request) {
        DataRecord record = new DataRecord();
        record.setTitle(request.getTitle());
        record.setCategory(request.getCategory());
        record.setTotalCount(request.getTotalCount());
        record.setActiveCount(request.getActiveCount());
        return service.create(record);
    }
}
