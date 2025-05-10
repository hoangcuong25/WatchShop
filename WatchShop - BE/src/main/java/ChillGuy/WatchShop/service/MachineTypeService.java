package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.MachineType;
import ChillGuy.WatchShop.repository.MachineTypeRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class MachineTypeService {
    private final MachineTypeRepository machineTypeRepository;

    public MachineTypeService(MachineTypeRepository machineTypeRepository) {
        this.machineTypeRepository = machineTypeRepository;
    }

    public MachineType createMachineType(MachineType machineType) throws ThrowBadReqException {
        if (machineTypeRepository.existsByName(machineType.getName())) {
            throw new ThrowBadReqException("Machine type already exists");
        }
        return machineTypeRepository.save(machineType);
    }

    public List<MachineType> getMachineTypes() {
        return machineTypeRepository.findAll();
    }

    public void deleteMachineType(Long id) {
        machineTypeRepository.deleteById(id);
    }

    public MachineType updateMachineType(MachineType machineType) throws ThrowBadReqException {
        if (!machineTypeRepository.existsById(machineType.getId())) {
            throw new ThrowBadReqException("Machine type not found");
        }

        return machineTypeRepository.save(machineType);
    }
}