/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

import {Pagination} from "/static/js/pagination/pagination.js";
let pagination;

function callProductTable(page, size) {
    axios.get('/products/lists', {
        params: {
            page: page,  // 페이지 번호
            size: size  // 페이지 크기
        }
    }) // 백엔드 API URL
        .then(function (response) {
            const productDtos = response.data.content;
            const tbody = document.getElementById('product-card');
            tbody.innerHTML = ''; // 초기화.
            let length = productDtos.length;
            for (let i = 0; i < length; i++) {
                const productDto = productDto[i];
                const divCard = document.createElement('div');
                divCard.className = 'col mb-5';
                divCard.innerHTML = `
            <div class="card h-100">
                <!-- Product image-->
                <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${productDto.productName}</h5>
                        <!-- Product price-->
                        ${productDto.productPrice}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-warning mt-auto" href="#">장바구니 담기</a></div>
                </div>
            </div>
      `;
                tbody.appendChild(divCard);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function pageClickEvent(event) {
    event.preventDefault();
    let pageText = event.target.textContent;
    let page = Number(pageText);
    let currentPage;
    if (!isNaN(page)) {
        pagination.currentPage = page;
    } else if (pageText === '«') {
        if (pagination.currentPage > 1) {
            pagination.currentPage = pagination.currentPage - 1;
        }
    } else if (pageText === '»') {
        if (pagination.currentPage < pagination.totalPage) {
            pagination.currentPage = pagination.currentPage + 1;
        }
    }
    pagination.renderPagination(pagination.currentPage);
    callProductTable(pagination.currentPage - 1, pagination.dataPerPage);
}