package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.Styles;
import ChillGuy.WatchShop.repository.StyleRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class StyleService {
    private final StyleRepository styleRepository;

    public StyleService(StyleRepository styleRepository) {
        this.styleRepository = styleRepository;
    }

    public Styles createStyle(Styles style) throws ThrowBadReqException {
        if (styleRepository.existsByName(style.getName())) {
            throw new ThrowBadReqException("Style already exists");
        }
        return styleRepository.save(style);
    }

    public List<Styles> getAllStyles() {
        return styleRepository.findAll();
    }

    public void deleteStyle(Long id) {
        styleRepository.deleteById(id);
    }

    public Styles updateStyle(Styles style) throws ThrowBadReqException {
        Styles currentStyle = styleRepository.findById(style.getId()).orElse(null);
        if (currentStyle == null) {
            throw new ThrowBadReqException("Style not found");
        }
        currentStyle.setName(style.getName());
        return styleRepository.save(currentStyle);
    }
}
