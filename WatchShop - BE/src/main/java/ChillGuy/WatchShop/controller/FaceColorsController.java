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

import ChillGuy.WatchShop.domain.FaceColors;
import ChillGuy.WatchShop.service.FaceColorsService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class FaceColorsController {
    private final FaceColorsService faceColorsService;

    public FaceColorsController(FaceColorsService faceColorsService) {
        this.faceColorsService = faceColorsService;
    }

    @PostMapping("/face-colors")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new face color")
    public ResponseEntity<FaceColors> createFaceColors(@RequestBody FaceColors faceColors) throws ThrowBadReqException {
        FaceColors createdFaceColors = faceColorsService.createFaceColors(faceColors);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFaceColors);
    }

    @GetMapping("/face-colors")
    @ApiMessage("Get all face colors")
    public ResponseEntity<List<FaceColors>> getAllFaceColors() {
        List<FaceColors> faceColors = faceColorsService.getAllFaceColors();
        return ResponseEntity.ok(faceColors);
    }

    @DeleteMapping("/face-colors/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Delete a face color")
    public ResponseEntity<Void> deleteFaceColors(@PathVariable Long id) {
        faceColorsService.deleteFaceColors(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/face-colors")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a face color")
    public ResponseEntity<FaceColors> updateFaceColors(@RequestBody FaceColors faceColors) {
        FaceColors updatedFaceColors = faceColorsService.updateFaceColors(faceColors);
        return ResponseEntity.ok(updatedFaceColors);
    }
}