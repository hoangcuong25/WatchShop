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

import ChillGuy.WatchShop.domain.BrandOrigins;
import ChillGuy.WatchShop.service.BrandOriginsService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class BrandOriginsController {
    private final BrandOriginsService brandOriginsService;

    public BrandOriginsController(BrandOriginsService brandOriginsService) {
        this.brandOriginsService = brandOriginsService;
    }

    @PostMapping("/brand-origins")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new brand origin")
    public ResponseEntity<BrandOrigins> createBrandOrigins(@RequestBody BrandOrigins brandOrigins)
            throws ThrowBadReqException {
        BrandOrigins createdBrandOrigins = brandOriginsService.createBrandOrigins(brandOrigins);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBrandOrigins);
    }

    @GetMapping("/brand-origins")
    @ApiMessage("Get all brand origins")
    public ResponseEntity<List<BrandOrigins>> getAllBrandOrigins() {
        List<BrandOrigins> brandOrigins = brandOriginsService.getAllBrandOrigins();
        return ResponseEntity.ok(brandOrigins);
    }

    @DeleteMapping("/brand-origins/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Delete a brand origin")
    public ResponseEntity<Void> deleteBrandOrigins(@PathVariable Long id) {
        brandOriginsService.deleteBrandOrigins(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/brand-origins")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a brand origin")
    public ResponseEntity<BrandOrigins> updateBrandOrigins(@RequestBody BrandOrigins brandOrigins) {
        BrandOrigins updatedBrandOrigins = brandOriginsService.updateBrandOrigins(brandOrigins);
        return ResponseEntity.ok(updatedBrandOrigins);
    }
}