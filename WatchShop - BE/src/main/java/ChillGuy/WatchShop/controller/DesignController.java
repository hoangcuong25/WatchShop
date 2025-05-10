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

import ChillGuy.WatchShop.domain.Design;
import ChillGuy.WatchShop.service.DesignService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class DesignController {
    private final DesignService designService;

    public DesignController(DesignService designService) {
        this.designService = designService;
    }

    @PostMapping("/designs")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new design")
    public ResponseEntity<Design> createDesign(@RequestBody Design design) throws ThrowBadReqException {
        Design createdDesign = designService.createDesign(design);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDesign);
    }

    @GetMapping("/designs")
    @ApiMessage("Get all designs")
    public ResponseEntity<List<Design>> getAllDesigns() {
        List<Design> designs = designService.getAllDesigns();
        return ResponseEntity.ok(designs);
    }

    @DeleteMapping("/designs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Delete a design")
    public ResponseEntity<Void> deleteDesign(@PathVariable Long id) {
        designService.deleteDesign(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/designs")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a design")
    public ResponseEntity<Design> updateDesign(@RequestBody Design design) {
        Design updatedDesign = designService.updateDesign(design);
        return ResponseEntity.ok(updatedDesign);
    }
}
