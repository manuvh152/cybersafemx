import { Body, Controller, Get, Post, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  createComplain(@Body() complaint: CreateComplaintDto){
    return this.complaintsService.createComplaint(complaint);
  }

  @Get()
  getComplaints(){
    return this.complaintsService.getComplaints();
  }

  @Get(':id')
  getComplaint(@Param('id', ParseIntPipe) id: number){
    return this.complaintsService.getComplaint(id);
  }

  @Delete(':id')
  deleteComplaint(@Param('id', ParseIntPipe) id: number){
    return this.complaintsService.deleteComplaint(id);
  }
}
