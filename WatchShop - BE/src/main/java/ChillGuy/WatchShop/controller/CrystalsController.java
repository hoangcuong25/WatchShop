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

import ChillGuy.WatchShop.domain.Crystals;
import ChillGuy.WatchShop.service.CrystalsService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class CrystalsController {
    private final CrystalsService crystalsService;

    public CrystalsController(CrystalsService crystalsService) {
        this.crystalsService = crystalsService;
    }

    @PostMapping("/crystals")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new crystal")
    public ResponseEntity<Crystals> createCrystals(@RequestBody Crystals crystals) throws ThrowBadReqException {
        Crystals createdCrystals = crystalsService.createCrystals(crystals);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCrystals);
    }

    @GetMapping("/crystals")
    @ApiMessage("Get all crystals")
    public ResponseEntity<List<Crystals>> getAllCrystals() {
        List<Crystals> crystals = crystalsService.getAllCrystals();
        return ResponseEntity.ok(crystals);
    }

    @DeleteMapping("/crystals/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Delete a crystal")
    public ResponseEntity<Void> deleteCrystals(@PathVariable Long id) {
        crystalsService.deleteCrystals(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/crystals")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a crystal")
    public ResponseEntity<Crystals> updateCrystals(@RequestBody Crystals crystals) {
        Crystals updatedCrystals = crystalsService.updateCrystals(crystals);
        return ResponseEntity.ok(updatedCrystals);
    }
}