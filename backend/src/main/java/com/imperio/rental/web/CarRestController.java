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
	
	
	
	 /**
     * Retrieves a paginated list of cars.
     * Optionally filters by availability.
     *
     * @param page      The page number (default: 0)
     * @param size      The number of items per page (default: 5)
     * @param available Optional filter to retrieve only available cars
     * @return A paginated response containing cars
     */
	@GetMapping("/all")
	public PaginatedResponse<Car> getAllCars(
			  @RequestParam( defaultValue = "0") int page,
		        @RequestParam( defaultValue = "5") int size,
		        @RequestParam(required = false) Boolean available 
		        
			){
		return carService.getAllCars(page,size,available);
	}
	
	
	
	
	/**
     * Creates a new car. Only accessible to admins.
     * Accepts multipart form data (for file uploads like images).
     *
     * @param car The car details (DTO)
     * @return The ID of the newly created car
     * @throws IOException If an error occurs while processing the file
     */
	@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
	@PostMapping(value="",consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
	public Long createCar(CarDto car) throws IOException {
		return carService.createCar(car);
	}
	
	
	
	/**
     * Updates an existing car by ID. Only accessible to admins.
     * Accepts multipart form data.
     *
     * @param id  The ID of the car to update
     * @param car The updated car details (DTO)
     * @return The updated car entity
     * @throws CarNotFoundException If the car with the given ID does not exist
     * @throws IOException          If an error occurs while processing the file
     */
	@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
	@PutMapping(value="/{id}",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
	public Car updateCar(@PathVariable Long id,CarDto car) throws CarNotFoundException, IOException {
		car.setId(id);
		return carService.updateCar(car);
		
	}
	
	
	 /**
     * Deletes a car by ID. Only accessible to admins.
     *
     * @param id The ID of the car to delete
     * @return True if the deletion was successful, false otherwise
     * @throws CarNotFoundException If the car with the given ID does not exist
     */
	@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public boolean deleteCat(@PathVariable Long id) throws CarNotFoundException {
		 return carService.deleteCar(id);
	}

}
