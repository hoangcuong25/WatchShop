package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.FaceColors;
import ChillGuy.WatchShop.repository.FaceColorsRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class FaceColorsService {
    private final FaceColorsRepository faceColorsRepository;

    public FaceColorsService(FaceColorsRepository faceColorsRepository) {
        this.faceColorsRepository = faceColorsRepository;
    }

    public FaceColors createFaceColors(FaceColors faceColors) throws ThrowBadReqException {
        if (faceColorsRepository.existsByName(faceColors.getName())) {
            throw new ThrowBadReqException("Face color already exists");
        }
        return faceColorsRepository.save(faceColors);
    }

    public List<FaceColors> getAllFaceColors() {
        return faceColorsRepository.findAll();
    }

    public void deleteFaceColors(Long id) {
        faceColorsRepository.deleteById(id);
    }

    public FaceColors updateFaceColors(FaceColors faceColors) {
        if (faceColors.getName() != null) {
            faceColors.setName(faceColors.getName());
        }

        return faceColorsRepository.save(faceColors);
    }
}