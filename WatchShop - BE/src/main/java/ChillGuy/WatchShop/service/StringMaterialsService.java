package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.StringMaterials;
import ChillGuy.WatchShop.repository.StringMaterialsRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class StringMaterialsService {
    private final StringMaterialsRepository stringMaterialsRepository;

    public StringMaterialsService(StringMaterialsRepository stringMaterialsRepository) {
        this.stringMaterialsRepository = stringMaterialsRepository;
    }

    public StringMaterials createStringMaterials(StringMaterials stringMaterials) throws ThrowBadReqException {
        if (stringMaterialsRepository.existsByName(stringMaterials.getName())) {
            throw new ThrowBadReqException("String material already exists");
        }
        return stringMaterialsRepository.save(stringMaterials);
    }

    public List<StringMaterials> getAllStringMaterials() {
        return stringMaterialsRepository.findAll();
    }

    public void deleteStringMaterials(Long id) {
        stringMaterialsRepository.deleteById(id);
    }

    public StringMaterials updateStringMaterials(StringMaterials stringMaterials) {
        if (stringMaterials.getName() != null) {
            stringMaterials.setName(stringMaterials.getName());
        }

        return stringMaterialsRepository.save(stringMaterials);
    }
}