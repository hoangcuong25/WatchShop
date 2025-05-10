package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.Crystals;
import ChillGuy.WatchShop.repository.CrystalsRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class CrystalsService {
    private final CrystalsRepository crystalsRepository;

    public CrystalsService(CrystalsRepository crystalsRepository) {
        this.crystalsRepository = crystalsRepository;
    }

    public Crystals createCrystals(Crystals crystals) throws ThrowBadReqException {
        if (crystalsRepository.existsByName(crystals.getName())) {
            throw new ThrowBadReqException("Crystal already exists");
        }
        return crystalsRepository.save(crystals);
    }

    public List<Crystals> getAllCrystals() {
        return crystalsRepository.findAll();
    }

    public void deleteCrystals(Long id) {
        crystalsRepository.deleteById(id);
    }

    public Crystals updateCrystals(Crystals crystals) {
        if (crystals.getName() != null) {
            crystals.setName(crystals.getName());
        }

        return crystalsRepository.save(crystals);
    }
}