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

import ChillGuy.WatchShop.domain.StringMaterials;
import ChillGuy.WatchShop.service.StringMaterialsService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class StringMaterialsController {
    private final StringMaterialsService stringMaterialsService;

    public StringMaterialsController(StringMaterialsService stringMaterialsService) {
        this.stringMaterialsService = stringMaterialsService;
    }

    @PostMapping("/string-materials")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new string material")
    public ResponseEntity<StringMaterials> createStringMaterials(@RequestBody StringMaterials stringMaterials)
            throws ThrowBadReqException {
        StringMaterials createdStringMaterials = stringMaterialsService.createStringMaterials(stringMaterials);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStringMaterials);
    }

    @GetMapping("/string-materials")
    @ApiMessage("Get all string materials")
    public ResponseEntity<List<StringMaterials>> getAllStringMaterials() {
        List<StringMaterials> stringMaterials = stringMaterialsService.getAllStringMaterials();
        return ResponseEntity.ok(stringMaterials);
    }

    @DeleteMapping("/string-materials/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Delete a string material")
    public ResponseEntity<Void> deleteStringMaterials(@PathVariable Long id) {
        stringMaterialsService.deleteStringMaterials(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/string-materials")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a string material")
    public ResponseEntity<StringMaterials> updateStringMaterials(@RequestBody StringMaterials stringMaterials) {
        StringMaterials updatedStringMaterials = stringMaterialsService.updateStringMaterials(stringMaterials);
        return ResponseEntity.ok(updatedStringMaterials);
    }
}