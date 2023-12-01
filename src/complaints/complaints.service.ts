import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Complaint } from './complaint.entity';
import { Repository } from 'typeorm';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private complaintRepository: Repository<Complaint>
  ){}

  createComplaint(complaint: CreateComplaintDto){
    try {

      const newComplaint = this.complaintRepository.create(complaint);
      return this.complaintRepository.save(newComplaint);
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al crear complaint', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getComplaints(){
    try {

      const complaints = this.complaintRepository.find();

      return complaints;
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al obtener complaints', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getComplaint(id: number){
    try {

      const complaint = this.complaintRepository.findOneBy({id});

      return complaint;
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al obtener complaint', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteComplaint(id: number){
    try {

      return this.complaintRepository.delete(id);
      
    } catch (error) {
      console.log(error);
      return new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
