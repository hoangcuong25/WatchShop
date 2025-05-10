package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.Design;
import ChillGuy.WatchShop.repository.DesignRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class DesignService {
    private final DesignRepository designRepository;

    public DesignService(DesignRepository designRepository) {
        this.designRepository = designRepository;
    }

    public Design createDesign(Design design) throws ThrowBadReqException {
        if (designRepository.existsByName(design.getName())) {
            throw new ThrowBadReqException("Design already exists");
        }
        return designRepository.save(design);
    }

    public List<Design> getAllDesigns() {
        return designRepository.findAll();
    }

    public void deleteDesign(Long id) {
        designRepository.deleteById(id);
    }

    public Design updateDesign(Design design) {
        if (design.getName() != null) {
            design.setName(design.getName());
        }

        return designRepository.save(design);
    }
}
