package ChillGuy.WatchShop.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ChillGuy.WatchShop.service.MachineTypeService;

@RestController
@RequestMapping("/api/v1")
public class ServiceController {
    private final MachineTypeService machineTypeService;

    public ServiceController(MachineTypeService machineTypeService) {
        this.machineTypeService = machineTypeService;
    }

}
