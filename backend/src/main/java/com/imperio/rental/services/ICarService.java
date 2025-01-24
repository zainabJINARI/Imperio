package com.imperio.rental.services;


import java.io.IOException;

import com.imperio.rental.dtos.CarDto;
import com.imperio.rental.dtos.PaginatedResponse;
import com.imperio.rental.entities.Car;
import com.imperio.rental.exceptions.CarNotFoundException;

public interface ICarService {
	
	
	public Long createCar(CarDto car) throws IOException;
	public boolean deleteCar(Long id) throws CarNotFoundException;
	public Car updateCar(CarDto car) throws CarNotFoundException, IOException;
	public PaginatedResponse<Car> getAllCars(int page,int size);
	
	

}
