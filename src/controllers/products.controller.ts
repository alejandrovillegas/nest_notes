import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Put,
  Delete,
  // ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './../services/products.service';
import { ParseIntPipe } from '../common/parse-int.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':productId')
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and ${id}`;
  }

  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Post(':id')
  postProduct(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get('testexpress')
  @HttpCode(HttpStatus.ACCEPTED) // 👈 Using decorator
  getOne(@Res() response: Response, @Param('productId') productId: string) {
    response.status(200).send({ ok: productId }); // 👈 Using express directly
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.productsService.update(+id, payload);
  }
}
