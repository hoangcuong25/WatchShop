package ChillGuy.WatchShop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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

import ChillGuy.WatchShop.domain.Diameters;
import ChillGuy.WatchShop.service.DiametersService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class DiametersController {
    private final DiametersService diametersService;

    public DiametersController(DiametersService diametersService) {
        this.diametersService = diametersService;
    }

    @PostMapping("/diameters")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new diameters")
    public ResponseEntity<Diameters> createDiameters(@RequestBody Diameters diameters) throws ThrowBadReqException {
        Diameters createdDiameters = diametersService.createDiameters(diameters);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDiameters);
    }

    @GetMapping("/diameters")
    @ApiMessage("Get all diameters")
    public ResponseEntity<List<Diameters>> getAllDiameters() {
        List<Diameters> diameters = diametersService.getAllDiameters();
        return ResponseEntity.ok(diameters);
    }

    @DeleteMapping("/diameters/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Delete a diameters")
    public ResponseEntity<Void> deleteDiameters(@PathVariable Long id) {
        diametersService.deleteDiameters(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/diameters")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a diameters")
    public ResponseEntity<Diameters> updateDiameters(@RequestBody Diameters diameters) {
        Diameters updatedDiameters = diametersService.updateDiameters(diameters);
        return ResponseEntity.ok(updatedDiameters);
    }
}