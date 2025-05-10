package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.CaseMaterials;
import ChillGuy.WatchShop.repository.CaseMaterialsRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class CaseMaterialsService {
    private final CaseMaterialsRepository caseMaterialsRepository;

    public CaseMaterialsService(CaseMaterialsRepository caseMaterialsRepository) {
        this.caseMaterialsRepository = caseMaterialsRepository;
    }

    public CaseMaterials createCaseMaterials(CaseMaterials caseMaterials) throws ThrowBadReqException {
        if (caseMaterialsRepository.existsByName(caseMaterials.getName())) {
            throw new ThrowBadReqException("Case material already exists");
        }
        return caseMaterialsRepository.save(caseMaterials);
    }

    public List<CaseMaterials> getAllCaseMaterials() {
        return caseMaterialsRepository.findAll();
    }

    public void deleteCaseMaterials(Long id) {
        caseMaterialsRepository.deleteById(id);
    }

    public CaseMaterials updateCaseMaterials(CaseMaterials caseMaterials) {
        if (caseMaterials.getName() != null) {
            caseMaterials.setName(caseMaterials.getName());
        }

        return caseMaterialsRepository.save(caseMaterials);
    }
}