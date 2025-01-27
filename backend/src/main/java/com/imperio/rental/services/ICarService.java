package com.imperio.rental.services;


import java.io.IOException;

import com.imperio.rental.dtos.CarDto;
import com.imperio.rental.dtos.PaginatedResponse;
import com.imperio.rental.entities.Car;
import com.imperio.rental.exceptions.CarNotFoundException;

public interface ICarService {
	
	 /**
     * Creates a new car entry.
     *
     * @param car The car details provided as a DTO.
     * @return The ID of the newly created car.
     * @throws IOException If an error occurs while processing file uploads (e.g., images).
     */
	public Long createCar(CarDto car) throws IOException;

    /**
     * Deletes a car by its ID.
     *
     * @param id The ID of the car to delete.
     * @return True if deletion was successful, false otherwise.
     * @throws CarNotFoundException If the car with the given ID is not found.
     */
	public boolean deleteCar(Long id) throws CarNotFoundException;
	/**
     * Updates an existing car's details.
     *
     * @param car The updated car details provided as a DTO.
     * @return The updated car entity.
     * @throws CarNotFoundException If the car with the given ID does not exist.
     * @throws IOException If an error occurs while processing file uploads.
     */
	public Car updateCar(CarDto car) throws CarNotFoundException, IOException;
	 /**
     * Retrieves a paginated list of cars.
     * Optionally filters cars based on availability.
     *
     * @param page The page number (zero-based index).
     * @param size The number of cars per page.
     * @param available Optional filter to return only available cars.
     * @return A paginated response containing car entities.
     */
	public PaginatedResponse<Car> getAllCars(int page,int size, Boolean available);
	

}
