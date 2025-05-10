package ChillGuy.WatchShop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ChillGuy.WatchShop.domain.MachineType;
import ChillGuy.WatchShop.service.MachineTypeService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class MachineTypeController {
    private final MachineTypeService machineTypeService;

    public MachineTypeController(MachineTypeService machineTypeService) {
        this.machineTypeService = machineTypeService;
    }

    @PostMapping("/machine-types")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Tạo loại máy")
    public ResponseEntity<MachineType> createMachineType(@RequestBody MachineType machineType)
            throws ThrowBadReqException {
        return ResponseEntity.ok(machineTypeService.createMachineType(machineType));
    }

    @GetMapping("/machine-types")
    @ApiMessage("Lấy danh sách loại máy")
    public ResponseEntity<List<MachineType>> getMachineTypes() {
        return ResponseEntity.ok(machineTypeService.getMachineTypes());
    }

    @DeleteMapping("/machine-types/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Xóa loại máy")
    public ResponseEntity<Void> deleteMachineType(@PathVariable Long id) {
        machineTypeService.deleteMachineType(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/machine-types")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Cập nhật loại máy")
    public ResponseEntity<MachineType> updateMachineType(@RequestBody MachineType machineType)
            throws ThrowBadReqException {
        return ResponseEntity.ok(machineTypeService.updateMachineType(machineType));
    }
}
