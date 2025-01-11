import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  /**
   * Creates a new student record
   * @param createStudentDto - Data for creating a new student
   * @returns Newly created student
   * @throws ConflictException if email already exists
   */
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const student = this.studentRepository.create(createStudentDto);
      return await this.studentRepository.save(student);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  /**
   * Retrieves all students from the database
   * @returns Array of student records sorted by creation date
   */
  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  /**
   * Finds a specific student by ID
   * @param id - The ID of the student to find
   * @returns Student record
   * @throws NotFoundException if student doesn't exist
   */
  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ 
      where: { id } 
    });
    
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    
    return student;
  }

  /**
   * Updates a student's information
   * @param id - The ID of the student to update
   * @param updateStudentDto - The data to update
   * @returns Updated student record
   * @throws NotFoundException if student doesn't exist
   * @throws ConflictException if email already exists
   */
  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    try {
      // Merge the update data with existing student
      const updatedStudent = this.studentRepository.merge(student, updateStudentDto);
      return await this.studentRepository.save(updatedStudent);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }
} 