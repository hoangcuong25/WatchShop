package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.Diameters;
import ChillGuy.WatchShop.repository.DiametersRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class DiametersService {
    private final DiametersRepository diametersRepository;

    public DiametersService(DiametersRepository diametersRepository) {
        this.diametersRepository = diametersRepository;
    }

    public Diameters createDiameters(Diameters diameters) throws ThrowBadReqException {
        if (diametersRepository.existsByName(diameters.getName())) {
            throw new ThrowBadReqException("Diameters already exists");
        }
        return diametersRepository.save(diameters);
    }

    public List<Diameters> getAllDiameters() {
        return diametersRepository.findAll();
    }

    public void deleteDiameters(Long id) {
        diametersRepository.deleteById(id);
    }

    public Diameters updateDiameters(Diameters diameters) {
        if (diameters.getName() != null) {
            diameters.setName(diameters.getName());
        }

        return diametersRepository.save(diameters);
    }
}