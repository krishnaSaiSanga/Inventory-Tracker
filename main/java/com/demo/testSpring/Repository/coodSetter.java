package com.demo.testSpring.Repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.testSpring.Details.Coordinates;

@Repository
public interface coodSetter extends ListCrudRepository<Coordinates, Integer> {

}
