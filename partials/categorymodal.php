 <!-- Modal start -->
 <div class="first-section hidden" id="first-section-category">
        <div class="first-section__nav">
            <h3>
            Create Category
            </h3>
            <svg id="first-section__close__btn__category" class="first-section__close__btn" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                    </svg>
        </div>
      <form id="AddCategoryModal" class="first-section__form">
      <div class="first-section__body">
        <div class="first-section__body__input__group">
        <label for="name" class="first-section__body__label">Name</label>
        <input id="name" type="text" class="datepicker__text__input" placeholder="Enter name" name="name">
        </div>
        <div class="first-section__body__input__group">
        <label for="color" class="first-section__body__label">Color</label>
        <input id="color" name="color" type="color" class="datepicker__text__input" placeholder="Enter name">
        </div>
      </div>
      <div class="first-section__footer">
      <button type="submit" id="formSubmitButton" class="calendar__nav__container__Button--wide calendar__nav__container__Button"><span class="loader hidden"></span>Submit Category</button>
      </div>
      </form>
</div>
<!-- Modal end -->