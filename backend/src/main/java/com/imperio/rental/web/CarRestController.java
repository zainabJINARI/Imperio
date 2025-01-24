package com.imperio.rental.web;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.imperio.rental.dtos.CarDto;
import com.imperio.rental.dtos.PaginatedResponse;
import com.imperio.rental.entities.Car;
import com.imperio.rental.exceptions.CarNotFoundException;
import com.imperio.rental.services.ICarService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/cars")
@AllArgsConstructor
@CrossOrigin
public class CarRestController {
	
	
	private ICarService carService;
	
	
	
	
	@GetMapping("")
	public PaginatedResponse<Car> getAllCars(
			  @RequestParam( defaultValue = "0") int page,
		        @RequestParam( defaultValue = "5") int size
			){
		return carService.getAllCars(page,size);
	}
	
	
	@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
	@PostMapping(value="",consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
	public Long createCar(CarDto car) throws IOException {
		return carService.createCar(car);
	}
	
	
	@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
	@PutMapping(value="/{id}",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
	public Car updateCar(@PathVariable Long id,CarDto car) throws CarNotFoundException, IOException {
		car.setId(id);
		return carService.updateCar(car);
		
	}
	
	@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public boolean deleteCat(@PathVariable Long id) throws CarNotFoundException {
		 return carService.deleteCar(id);
	}

}
