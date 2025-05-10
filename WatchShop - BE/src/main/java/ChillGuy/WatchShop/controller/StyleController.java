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

import ChillGuy.WatchShop.domain.Styles;
import ChillGuy.WatchShop.service.StyleService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class StyleController {
    private final StyleService styleService;

    public StyleController(StyleService styleService) {
        this.styleService = styleService;
    }

    @PostMapping("/styles")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new style")
    public ResponseEntity<Styles> createStyle(@RequestBody Styles style) throws ThrowBadReqException {
        Styles createdStyle = styleService.createStyle(style);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStyle);
    }

    @GetMapping("/styles")
    @ApiMessage("Get all styles")
    public ResponseEntity<List<Styles>> getAllStyles() {
        List<Styles> styles = styleService.getAllStyles();
        return ResponseEntity.ok(styles);
    }

    @DeleteMapping("/styles/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Delete a style")
    public ResponseEntity<Void> deleteStyle(@PathVariable Long id) throws ThrowBadReqException {
        styleService.deleteStyle(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/styles")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a style")
    public ResponseEntity<Styles> updateStyle(@RequestBody Styles style) throws ThrowBadReqException {
        Styles updatedStyle = styleService.updateStyle(style);
        return ResponseEntity.ok(updatedStyle);
    }
}