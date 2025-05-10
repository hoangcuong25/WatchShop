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

import ChillGuy.WatchShop.domain.CaseMaterials;
import ChillGuy.WatchShop.service.CaseMaterialsService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class CaseMaterialsController {
    private final CaseMaterialsService caseMaterialsService;

    public CaseMaterialsController(CaseMaterialsService caseMaterialsService) {
        this.caseMaterialsService = caseMaterialsService;
    }

    @PostMapping("/case-materials")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new case material")
    public ResponseEntity<CaseMaterials> createCaseMaterials(@RequestBody CaseMaterials caseMaterials)
            throws ThrowBadReqException {
        CaseMaterials createdCaseMaterials = caseMaterialsService.createCaseMaterials(caseMaterials);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCaseMaterials);
    }

    @GetMapping("/case-materials")
    @ApiMessage("Get all case materials")
    public ResponseEntity<List<CaseMaterials>> getAllCaseMaterials() {
        List<CaseMaterials> caseMaterials = caseMaterialsService.getAllCaseMaterials();
        return ResponseEntity.ok(caseMaterials);
    }

    @DeleteMapping("/case-materials/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Delete a case material")
    public ResponseEntity<Void> deleteCaseMaterials(@PathVariable Long id) {
        caseMaterialsService.deleteCaseMaterials(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/case-materials")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a case material")
    public ResponseEntity<CaseMaterials> updateCaseMaterials(@RequestBody CaseMaterials caseMaterials) {
        CaseMaterials updatedCaseMaterials = caseMaterialsService.updateCaseMaterials(caseMaterials);
        return ResponseEntity.ok(updatedCaseMaterials);
    }
}