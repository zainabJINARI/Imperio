package com.imperio.rental.services;



import java.io.Console;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.imperio.rental.dtos.CarDto;
import com.imperio.rental.dtos.PaginatedResponse;
import com.imperio.rental.entities.Car;
import com.imperio.rental.exceptions.CarNotFoundException;
import com.imperio.rental.mappers.CarMapper;
import com.imperio.rental.repositories.CarRepository;

import lombok.AllArgsConstructor;



@Service
@AllArgsConstructor
public class CarServiceImpl  implements ICarService{
	
	private CarRepository carRepository;
	private CarMapper carMapper;
	

	@Override
	public Long createCar(CarDto car) throws IOException {
		System.out.println(car);
		Car carCreated = carMapper.fromCarDto(car);
		System.out.println(carCreated);
		carRepository.save(carCreated);
		return carRepository.save(carCreated).getId();
	}

	@Override
	public boolean deleteCar(Long id) throws CarNotFoundException {
		
		Car car = carRepository.findById(id).orElse(null);
		if(car==null) {
			throw new CarNotFoundException("Car Not Found for id "+id);
		}else {
			carRepository.deleteById(id);
			return true;
			
		}
		
		
	}

	@Override
	public Car updateCar(CarDto car) throws CarNotFoundException, IOException {
		
		
		Car carToUpdate = carRepository.findById(car.getId()).orElse(null);
		
		if(carToUpdate==null) {
			throw new CarNotFoundException("Car Not Found for id "+car.getId());
		}else {
			 if (car.getBrand() != null) {
			        carToUpdate.setBrand(car.getBrand());
			    }
			 if( car.getIsAvailable()!=null  ) {
				 carToUpdate.setAvailable(car.getIsAvailable());
				 
			 }
			    if (car.getModel() != null) {
			        carToUpdate.setModel(car.getModel());
			    }
			    if (car.getPricePerDay() != 0) {
			        carToUpdate.setPricePerDay(car.getPricePerDay());
			    }
			    String returnedImage=null;
			    if(car.getPicture()!=null) {
//			    	logic to update the image if the user wants to 
			    	
			    	try {
						Files.deleteIfExists(Paths.get(URI.create(carToUpdate.getPicture())));
					} catch (IOException e) {
						System.err.println("Failed to delete old image of car at path: " + carToUpdate.getPicture());
						e.printStackTrace();
					}
					Path path = Paths.get(System.getProperty("user.home"),"cars-app-files","cars-images");
					String imageId = UUID.randomUUID().toString();
					Path imagePath  = Paths.get(System.getProperty("user.home"),"cars-app-files","cars-images",imageId+".png");
					Files.copy(car.getPicture().getInputStream(),imagePath);
					carToUpdate.setPicture(imagePath.toUri().toString());
					returnedImage = encodeImageToBase64(imagePath);
			    	
			    	
			    	
			    }
			
			    carRepository.save(carToUpdate);
			    
//			    if use didn't change the image the image is already present in the frontend no need to send it again 
			    carToUpdate.setPicture(returnedImage);
		        
				return carToUpdate;
		}
      
	}
	
	private  String encodeImageToBase64(Path imagePath) {
        try {
            byte[] imageBytes = Files.readAllBytes(imagePath);
            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return null; // In case of error, return null or handle it as per your requirement
        }
    }

	@Override
	public PaginatedResponse<Car> getAllCars(int page,int size , Boolean available) {
		
		
		Page<Car> carPage = null;
		if(available ==null) {
			carPage= carRepository.findAll(PageRequest.of(page, size));
		}else {
			carPage = carRepository.findByIsAvailable((boolean)available, PageRequest.of(page,size));
		}
		
		
		List<Car> cars = carPage.getContent().stream().map(c->{
			
			String sanitizedPhotoPath = c.getPicture().replace("file:///", "").replace("file:/", "");

            // Construct the full path
            Path path;
            if (Paths.get(sanitizedPhotoPath).isAbsolute()) {
                path = Paths.get(sanitizedPhotoPath);
            } else {
                path = Paths.get(System.getProperty("user.home"), "cars-app-files","cars-images", sanitizedPhotoPath);
            }

            // Convert to Base64
            c.setPicture(encodeImageToBase64(path)) ;
            return c;
		}).collect(Collectors.toList());
				
		
		return new PaginatedResponse<>(cars, carPage.getTotalElements());
	}

	

}
